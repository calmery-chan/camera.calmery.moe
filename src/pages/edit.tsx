import React from "react";
import { NextPage } from "next";
import { withRedux, NextPageContextWithRedux } from "~/modules";
import { Canvas } from "~/containers/Canvas";

const Edit: NextPage = () => <Canvas />;

Edit.getInitialProps = async (_: NextPageContextWithRedux) => {
  // ToDo
};

export default withRedux(Edit);