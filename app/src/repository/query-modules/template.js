define(["thymeleaf", "../../config"], function(thymeleaf, config) {
  let templateEngine = new thymeleaf.TemplateEngine();
  return {
    renderFile: (file, resultCallback, errorCallback) => {
      templateEngine.processFile(`${config.VIEW_DIR}/${file}`).then(resultCallback);
    }
  };
});
