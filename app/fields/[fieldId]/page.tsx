import { getField, getFields } from "@/app/_services/dataService";
import { FieldParams } from "@/app/_types/fields";

export async function generateMetadata({ params }: FieldParams) {
  const { name } = await getField(params.fieldId);
  return {
    title: name,
  };
}

export async function generateStaticParams() {
  const fields = await getFields();

  const ids = fields?.map((field) => ({
    fieldId: String(field.id),
  }));
  return ids;
}

const Page = async ({ params }: FieldParams) => {
  const field = await getField(params.fieldId);
  
  return <div>{field.name}</div>;
};

export default Page;
