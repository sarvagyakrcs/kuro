"use client";
import { newVerification } from "@/actions/auth";
import CodeBlock from "@/components/global/code-block";
import Logo from "@/components/global/logo";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { PROJECT_NAME } from "@/metadata";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { IconLoader } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function NewVerficationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const {
    isPending,
    mutate: verify,
    isError,
  } = useMutation({
    mutationKey: ["new-verification"],
    mutationFn: newVerification,
    onMutate: () => {
      toast.loading("Verifying", { id: "verification" });
    },
    onSuccess: () => {
      toast.success("Verification successfull", { id: "verification" });
    },
    onError: (error) => {
      toast.error(error.message, { id: "verification" });
    },
  });

  useEffect(() => {
    verify(token);
  }, [token, verify]);

  return (
    <div className="relative isolate overflow-hidden bg-linear-to-b from-indigo-100/20 dark:from-indigo-950/20">
      <div className="mx-auto max-w-7xl pt-10 pb-24 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
        <div className="px-6 lg:px-0 lg:pt-4">
          <div className="mx-auto max-w-2xl">
            <div className="max-w-lg">
              <Logo  />
              <div className="mt-24 sm:mt-32 lg:mt-16">
                <Link href="/changelog" className="inline-flex space-x-6">
                  <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm/6 font-semibold text-indigo-600 ring-1 ring-indigo-600/10 ring-inset dark:bg-indigo-400/10 dark:text-indigo-400 dark:ring-indigo-400/20">
                    What&apos;s new
                  </span>
                  <span className="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-600 dark:text-gray-400">
                    <span>Changelog</span>
                    <ChevronRightIcon
                      className="size-5 text-gray-400 dark:text-gray-500"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </div>
              <h1 className="mt-10 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl dark:text-white">
                Verifying your {PROJECT_NAME.toLocaleLowerCase()} account
              </h1>
              {isPending ? (
                <IconLoader className="mt-10 h-6 w-6 animate-spin text-gray-900 dark:text-white" />
              ) : isError ? (
                <p className="mt-6 text-xl tracking-tight text-red-600 dark:text-red-400">
                  Something went wrong. Please try again.
                </p>
              ) : (
                <div>
                  <p className="mt-6 text-base text-gray-600 dark:text-gray-400">
                    You have successfully verified your email address. You can
                    now use all the features of {PROJECT_NAME}.
                  </p>
                  <Button className="my-4" href="/login">
                    Login
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
          <div
            className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white dark:bg-gray-900 ring-1 shadow-xl shadow-indigo-600/10 dark:shadow-indigo-400/5 ring-indigo-50 dark:ring-indigo-900 md:-mr-20 lg:-mr-36"
            aria-hidden="true"
          />
          <div className="shadow-lg md:rounded-3xl">
            <div className="bg-indigo-500 dark:bg-indigo-600 [clip-path:inset(0)] md:[clip-path:inset(0_round_var(--radius-3xl))]">
              <div
                className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 dark:bg-indigo-800 opacity-20 ring-1 ring-white dark:ring-gray-800 ring-inset md:ml-20 lg:ml-36"
                aria-hidden="true"
              />
              <div className="relative px-6 pt-8 sm:pt-16 md:pr-0 md:pl-16">
                <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                  <div className="w-screen overflow-hidden rounded-tl-xl bg-gray-900 dark:bg-gray-950">
                    <div className="flex bg-gray-800/40 dark:bg-gray-800/60 ring-1 ring-white/5">
                      <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                        <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                          NotificationSetting.jsx
                        </div>
                        <div className="border-r border-gray-600/10 dark:border-gray-700/30 px-4 py-2">
                          App.jsx
                        </div>
                      </div>
                    </div>
                    <div className="px-6 pt-6 pb-14">
                      <CodeBlock
                        code={`
import { useState } from 'react';
import { Switch } from '@headlessui/react';

function Example() {
  const [enabled, setEnabled] = useState(true);

  return (
    <form action="/notification-settings" method="post">
      <Switch checked={enabled} onChange={setEnabled} name="notification">
        ${PROJECT_NAME}
      </Switch>
      <button>Submit</button>
    </form>
  );
}
                        `
                      }
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute inset-0 ring-1 ring-black/10 dark:ring-white/10 ring-inset md:rounded-3xl"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-white dark:from-gray-950 sm:h-32" />
    </div>
  );
}
