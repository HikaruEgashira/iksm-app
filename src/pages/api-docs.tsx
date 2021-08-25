import { NextPage } from "next";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const Swagger: NextPage = () => {
  return <SwaggerUI url="/api/doc" />;
};
export default Swagger;
