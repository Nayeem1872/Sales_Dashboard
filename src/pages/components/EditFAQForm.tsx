// src/components/EditFAQForm.tsx
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import toast from "react-hot-toast";

interface EditFAQFormProps {
  faqToEdit: any;
  onUpdate: (updatedFAQ: any) => void;
  onCancel: () => void;
}

export default function EditFAQForm({
  faqToEdit,
  onUpdate,
  onCancel,
}: EditFAQFormProps) {
  const [question, setQuestion] = useState(faqToEdit.question);
  const [answer, setAnswer] = useState(faqToEdit.answer);

  useEffect(() => {
    setQuestion(faqToEdit.question);
    setAnswer(faqToEdit.answer);
  }, [faqToEdit]);

  const handleSubmit = () => {
    if (!question.trim() || !answer.trim()) {
      toast.error("Question and answer cannot be empty");
      return;
    }
    onUpdate({ ...faqToEdit, question, answer });
    // Parent will handle closing.
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit FAQ</DialogTitle>
        <DialogDescription>
          Update this frequently asked question.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label htmlFor="edit-question" className="text-sm font-medium">
            Question
          </label>
          <Input
            id="edit-question"
            placeholder="Enter the question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="edit-answer" className="text-sm font-medium">
            Answer
          </label>
          <Textarea
            id="edit-answer"
            placeholder="Enter the answer"
            rows={4}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Update</Button>
      </DialogFooter>
    </>
  );
}
