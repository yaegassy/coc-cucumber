import { startServer } from '@cucumber/language-server';
import path from 'path';

const wasmUrls = {
  java: path.join(__dirname, 'tree-sitter-java.wasm'),
  typescript: path.join(__dirname, 'tree-sitter-typescript.wasm'),
};

startServer(wasmUrls);
