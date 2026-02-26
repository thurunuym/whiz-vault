'use client'
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface CustomInputProps {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}

const CustomInput = ({
  form,
  name,
  label,
  placeholder,
  type = "text",
}: CustomInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <FormControl>
            <input
              type={type}
              placeholder={placeholder}
              className="input-class"
              {...field}
            />
          </FormControl>
          <FormMessage className="form-message" />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;