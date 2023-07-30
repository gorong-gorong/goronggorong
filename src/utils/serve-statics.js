import express from 'express';
import path from 'path';

const serveStatics = function (srcFolder) {
  let src;
  if (process.env.NODE_ENV === 'production') {
    src = path.join(__dirname, `../../src/views/${srcFolder}`);
  } else if (process.env.NODE_ENV === 'development') {
    src = path.join(__dirname, `../views/${srcFolder}`);
  }
  const option = { index: `${srcFolder}.html` };

  return express.static(src, option);
};

export default serveStatics;
