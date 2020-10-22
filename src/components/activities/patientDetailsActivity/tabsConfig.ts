import { ITabConfig } from "../../accessories/tabs/types";

export const patientDetailTabs: { header: ITabConfig, content: ITabConfig } = {
  header: {
    mainClass: 'patientDetils__content__header',
    items: [
      {0: "Summary"},
      {1: "Triage"},
      {2: "Admission"},
      {3: "Therapy"},
      {4: "Vaccination"},
      {5: "Lab Exam"}
    ]
  },
  content: {
    mainClass: 'patientDetils__content__body',
    items: [
      {0: "Content 1"},
      {1: "Content 2"},
      {2: "Content 3"},
      {3: "Content 4"},
      {4: "Content 5"},
      {5: "Content 6"}
    ]
  }
}