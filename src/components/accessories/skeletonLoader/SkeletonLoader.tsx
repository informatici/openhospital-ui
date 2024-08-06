import Skeleton from "@mui/lab/Skeleton";
import React, { Fragment, FunctionComponent } from "react";

const SkeletonLoader: FunctionComponent = () => {
  return (
    <Fragment>
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={200}
        style={{ margin: "5px 0px" }}
      />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </Fragment>
  );
};

export default SkeletonLoader;
