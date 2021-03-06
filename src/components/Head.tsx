import _Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import "~/utils/sentry";

export const Head: React.FC = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <_Head>
      <link rel="canonical" href={`${process.env.ORIGIN}${pathname}`} />
      {children}
    </_Head>
  );
};
