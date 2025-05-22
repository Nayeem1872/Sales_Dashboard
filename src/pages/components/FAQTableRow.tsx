// src/components/FAQTableRow.tsx
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { TableCell, TableRow } from "../../components/ui/table";

interface FAQTableRowProps {
  faq: any;
  onEdit: (faq: any) => void;
  onDelete: (id: string) => void;
}

export default function FAQTableRow({
  faq,
  onEdit,
  onDelete,
}: FAQTableRowProps) {
  return (
    <TableRow key={faq.id}>
      <TableCell className="font-medium">{faq.question}</TableCell>
      <TableCell className="max-w-md truncate">{faq.answer}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(faq)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(faq.id)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
