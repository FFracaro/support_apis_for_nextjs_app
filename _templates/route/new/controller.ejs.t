---
to: src/controllers/<%=h.changeCase.paramCase(name)%>.controller.ts
unless_exists: true
---

class <%= name %>Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpRequest> {
    const <%=h.changeCase.snakeCase(name)%>_service = new <%= name %>Service()

    <% if(locals.route_return_code === '200'){ -%>const result = <% } -%>await <%=h.changeCase.snakeCase(name)%>_service.execute()

    return { statusCode: <%= route_return_code %>, body: <% if(locals.route_return_code === '200'){ -%>result<% } else { -%>null<% } -%> }
  }
}
