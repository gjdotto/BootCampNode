import fastify from "fastify";
import crypto from "node:crypto";

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
});

const courses = [
  { id: "1", title: "Curso 1" },
  { id: "2", title: "Curso 2" },
  { id: "3", title: "Curso 3" },
  { id: "4", title: "Curso 4" },
];

server.get("/courses", (request, reply) => {
  return reply.send({ courses });
});

server.get("/courses/:id", (request, reply) => {
  type Params = {
    id: string;
  };

  const params = request.params as Params;
  const courseId = params.id;
  const course = courses.find((course) => course.id === courseId);
  if (course) {
    return { course };
  }
  return reply.status(404).send();
});

server.post("/courses", (request, reply) => {
  type Body = {
    title: string;
  };

  const body = request.body as Body;
  const courseId = crypto.randomUUID();
  const courseTitle = body.title;

  if (!courseTitle) {
    return reply.status(400).send({ message: "Título obrigatório" });
  }

  courses.push({ id: courseId, title: courseTitle });
  return reply.status(201).send({ courseId });
});

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
