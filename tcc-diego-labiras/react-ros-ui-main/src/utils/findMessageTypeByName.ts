export function findMessageTypeByName(name: string): string {
  switch (name) {
    case "/Battery": 
      return "package/msg/Battery";
  
    default:
      return "string";
  }
}