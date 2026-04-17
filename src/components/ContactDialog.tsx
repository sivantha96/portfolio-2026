import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as yup from 'yup';

export const contactMeSchema = yup.object({
  name: yup.string().trim().max(100).required('Name is required'),
  email: yup.string().email().required('Email is required'),
  message: yup.string().max(5000).required('Message is required'),
});

interface ContactDialogProps {
  triggerLabel?: string;
  triggerClassName?: string;
  triggerStyle?: React.CSSProperties;
}

export function ContactDialog({
  triggerLabel = 'Send a message',
  triggerClassName,
  triggerStyle,
}: ContactDialogProps) {
  const [loading, setLoading] = React.useState(false);
  const [isContactOpen, setIsContactOpen] = React.useState(false);

  const form = useForm({
    resolver: yupResolver(contactMeSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const handleOnSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    await axios.post('https://formspree.io/f/xvgzqwrn', {
      values,
    });
    setLoading(false);
    setIsContactOpen(false);
    toast.success('Message send successfully');
  });

  return (
    <>
      {triggerClassName ? (
        <button
          onClick={() => setIsContactOpen(true)}
          className={triggerClassName}
          style={triggerStyle}>
          {triggerLabel}
        </button>
      ) : (
        <Button onClick={() => setIsContactOpen(true)}>{triggerLabel}</Button>
      )}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Send a Message</DialogTitle>
            <DialogDescription>
              {`Fill out the form below to send me a message. I'll get back to you
            as soon as possible.`}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form className='space-y-4' onSubmit={handleOnSubmit}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        autoComplete='name'
                        placeholder='Your Name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        autoComplete='email'
                        placeholder='your@email.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='message'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        autoComplete='off'
                        placeholder='Your message here...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button loading={loading} type='submit' className='w-full'>
                Send Message
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
