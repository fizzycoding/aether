"use client";

import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useTypedAppFormContext, useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});
