# Part 0 Documentation

A picture tells a thousand words, and Mermaid helps create diagrams inline in Markdown files.

## Example Mermaid Diagram

```mermaid
graph TD;
    A[Start] --> B{Is it working?};
    B -->|Yes| C[Great!];
    B -->|No| D[Fix it];
    D --> B;
