"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { subscribeForm } from "@/schemas";

const Footer = () => {
  const form = useForm<z.infer<typeof subscribeForm>>({
    resolver: zodResolver(subscribeForm),
    defaultValues: {
      username: "",
      email: "",
    },
  });
  function onSubmit(values: z.infer<typeof subscribeForm>) {
    console.log(values);
  }

  return (
    <footer className="bg-secondary lg:px-48 lg:py-20 md:px-32 md:py-14 sm:px-16 sm:py-12 px-3 py-8 text-white">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:gap-0">
        <h3 className="text-size-3xl">Stay up to date</h3>
        <p className="text-size-xl">
          Get our emails. Letters from our five stars hotel, news about Ibiza,
          offers, and much more. Not too often — Just enough.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
          <div className="sm:flex gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="username"
                      className="lg:w-[400px] md:w-[300px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email"
                      className="lg:w-[400px] md:w-[300px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            variant="outline"
            type="submit"
            className="w-fit text-white mt-4"
          >
            Subscribe
          </Button>
        </form>
        <span className="text-center text-sm block mt-10">
          Thanks for subscribing to Aguas de Ibiza.
        </span>
      </Form>
    </footer>
  );
};

export default Footer;
