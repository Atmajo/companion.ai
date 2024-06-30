interface CompanionIdProps {
  params: {
    companionId: string;
  };
}

import CompanionForm from "@/components/CompanionForm";
import prismadb from "@/lib/prismadb";
import React from "react";

const CompanionPage = async ({ params }: CompanionIdProps) => {
  //Check sups

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
    },
  });

  const categories = await prismadb.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionPage;
