export default {
  routes: [
    {
      method: "GET",
      path: "/content",
      handler: "content.fetchAllContent",
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
  ],
};
