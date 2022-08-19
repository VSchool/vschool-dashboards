import { json } from "@remix-run/node";
 
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import styles from './styles/styles.css';
import font from "https://p.typekit.net/p.css?s=1&k=cjx1kwk&ht=tk&f=14032.14033.14034.14035.26893.26894.26897.26898.26909.26910.26913.26914.29382.29383&a=44359192&app=typekit&e=css";

import { getUser } from "./session.server";

export const links = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: "https://use.typekit.net/cjx1kwk.css"}
];
};

export const meta = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export const loader = async ({ request }) => {
  return json({
    user: await getUser(request),
  });
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      
      <head>
        <title>VSchool Dashboard</title>
        {/* <link rel="shortcut icon" href = "public/favicon.ico" type="image/x-icon"></link> */}
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
