import express from 'express';
import path from 'path';

const serveStatics = function (srcFolder) {
  const src = path.join(__dirname, `../views/${srcFolder}`);
  const option = { index: `${srcFolder}.html` };

  return express.static(src, option);
};

export default serveStatics;
