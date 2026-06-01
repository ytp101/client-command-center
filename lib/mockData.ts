export type DeliverableType = "Invoice" | "Design" | "Code" | "Document";
export type DeliverableStatus = "Approved" | "Awaiting Review" | "Draft";

export interface Deliverable {
  id: string;
  fileName: string;
  type: DeliverableType;
  dateAdded: string;
  status: DeliverableStatus;
  fileSize: string;
}

// 10 highly realistic freelance sprint deliverables
export const mockDeliverables: Deliverable[] = [
  {
    id: "del-1",
    fileName: "invoice-sprint-01.pdf",
    type: "Invoice",
    dateAdded: "2026-05-15",
    status: "Approved",
    fileSize: "142 KB"
  },
  {
    id: "del-2",
    fileName: "freelance-command-wireframes-v2.fig",
    type: "Design",
    dateAdded: "2026-05-18",
    status: "Approved",
    fileSize: "4.2 MB"
  },
  {
    id: "del-3",
    fileName: "postgres-schema-migration.sql",
    type: "Code",
    dateAdded: "2026-05-22",
    status: "Approved",
    fileSize: "45 KB"
  },
  {
    id: "del-4",
    fileName: "rest-api-endpoints-documentation.md",
    type: "Document",
    dateAdded: "2026-05-24",
    status: "Approved",
    fileSize: "18 KB"
  },
  {
    id: "del-5",
    fileName: "high-fidelity-ui-dashboard-mockups.fig",
    type: "Design",
    dateAdded: "2026-05-28",
    status: "Awaiting Review",
    fileSize: "28.5 MB"
  },
  {
    id: "del-6",
    fileName: "oauth2-auth-context-provider.tsx",
    type: "Code",
    dateAdded: "2026-05-30",
    status: "Awaiting Review",
    fileSize: "12 KB"
  },
  {
    id: "del-7",
    fileName: "invoice-sprint-02-draft.pdf",
    type: "Invoice",
    dateAdded: "2026-05-31",
    status: "Draft",
    fileSize: "148 KB"
  },
  {
    id: "del-8",
    fileName: "client-usability-testing-feedback.pdf",
    type: "Document",
    dateAdded: "2026-06-01",
    status: "Approved",
    fileSize: "1.2 MB"
  },
  {
    id: "del-9",
    fileName: "freelance-contract-amendment-signed.docx",
    type: "Document",
    dateAdded: "2026-06-01",
    status: "Awaiting Review",
    fileSize: "95 KB"
  },
  {
    id: "del-10",
    fileName: "kanban-milestones-column-view.tsx",
    type: "Code",
    dateAdded: "2026-06-02",
    status: "Draft",
    fileSize: "24 KB"
  }
];
