import FormBuilder from "@/components/FormBuilder";

const Add = () => {
  const defaultValues = {
    id: "",
    title: "",
    description: "",
    due: new Date(),
    created: new Date(),
    archived: false,
    priority: "low",
  };
  return <FormBuilder isNewEntry={true} defaultValues={defaultValues} id="" />;
};

export default Add;
