import { Option } from "../interfaces/select";

export const fileTypeOptions: Option[] = [
  {
    value: "vectorial",
    label: "Vectorial",
  },
  {
    value: "graphs",
    label: "Graphs",
  }
];

export const vectorialServicesOptions: Option[] = [
  {
    value: "informativeSummary",
    label: "Informative Summary",
  },
  {
    value: "dataVisualization",
    label: "Data Visualization",
  },
];

export const graphsServicesOptions: Option[] = [
  {
    value: "communityClustering",
    label: "Community Clustering",
  },
  {
    value: "graphsDescription",
    label: "Graphs Description",
  },
  {
    value: "gcn/gnn",
    label: "GCN/GNN",
  },
];
