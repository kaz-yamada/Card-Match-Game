import { rest } from "msw";
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Setup requests interception using the given handlers.
const server = setupServer(...handlers);

export { server, rest };
