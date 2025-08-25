import "dotenv/config";
import fastify from "fastify";
import { fastifySwagger } from "@fastify/swagger";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { createCourseRoute } from "./src/routes/create-course.ts";
import { getCoursesRoute } from "./src/routes/get-courses.ts";
import { getCourseByIdRoute } from "./src/routes/get-course-by-id.ts";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();

// server.register(fastifySwagger, {
//   openapi: {
//     info: {
//       title: "Cursos API",
//       description: "API para gerenciar cursos",
//       version: "1.0.0",
//     },
//   },
//   transform: jsonSchemaTransform,
// });

async function startServer() {
  if (process.env.NODE_ENV === "development") {
    server.register(fastifySwagger, {
      openapi: {
        info: {
          title: "Cursos API",
          description: "API para gerenciar cursos",
          version: "1.0.0",
        },
      },
      transform: jsonSchemaTransform,
    });

    const apiReferenceModule = await import("@scalar/fastify-api-reference");
    const scalarApiReference = apiReferenceModule.default;
    server.register(scalarApiReference, {
      routePrefix: "/docs",
    });
  }

  server.setSerializerCompiler(serializerCompiler);
  server.setValidatorCompiler(validatorCompiler);

  server.register(createCourseRoute);
  server.register(getCoursesRoute);
  server.register(getCourseByIdRoute);

  await server.listen({ port: 3333 });
  console.log("HTTP server running!");
}

// async function startServer() {
//   const apiReferenceModule = await import("@scalar/fastify-api-reference");
//   const scalarApiReference = apiReferenceModule.default;

//   server.register(scalarApiReference, {
//     routePrefix: "/docs",
//   });

//   await server.listen({ port: 3333 });
//   console.log("HTTP server running!");
// }

startServer();
