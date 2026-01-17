import React from "react";
import { Skeleton, Stack } from "@mui/material";

const ListPageSkeleton = () => {
  return (
    <div className="mt-5">
      {new Array(5).fill(0).map((item, index) => {
        return (
          <div key={index} className="flex flex-col md:flex-row gap-x-2 my-5 w-full">
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ width: 226, height: 160 }}
            />
            <div className="flex flex-col justify-between w-full">
              <Skeleton animation="wave" variant="text" sx={{ width: 300 }} />
              <Skeleton animation="wave" variant="text" sx={{ width: 300 }} />
              <Skeleton
                animation="wave"
                variant="rounded"
                sx={{ width: 45, height: 20 }}
              />
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    sx={{ width: 45, height: 20 }}
                  />
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    sx={{ width: 45, height: 20 }}
                  />
                </div>
                <div className="flex gap-2">
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    sx={{ width: 30, height: 20 }}
                  />
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    sx={{ width: 30, height: 20 }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListPageSkeleton;
