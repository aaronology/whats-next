import FormBuilder from "@/components/FormBuilder";

const Add = () => {
  const defaultValues = {
    title: "",
    description: "",
    due: new Date(),
    archived: false,
    priority: "low",
  };
  return <FormBuilder isNewEntry={true} defaultValues={defaultValues} />;
};

export default Add;
