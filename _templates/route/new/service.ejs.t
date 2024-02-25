---
to: src/services/<%=h.changeCase.paramCase(name)%>.service.ts
unless_exists: true
---

class <%= name %>Service {
  async execute(): Promise<any> {
  <% if(locals.database) { -%>
  const database = new Database()
  <% } -%>

    try {
        <% if(locals.database) { -%>
        await database.
        <% } -%>

    } catch (error) {
        console.log(JSON.stringify(error))
        throw error
    }<% if(locals.database){ -%> finally {
        await database.release()
    }
    <% } -%>

  }
}
