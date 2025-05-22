// src/components/AddFAQForm.tsx
import { useState } from "react";

import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import toast from "react-hot-toast";
import { Button } from "../../components/ui/button";

interface AddFAQFormProps {
  onSave: (question: string, answer: string) => void;
  onCancel: () => void;
}

export default function AddFAQForm({ onSave, onCancel }: AddFAQFormProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    if (!question.trim() || !answer.trim()) {
      toast.error("Question and answer cannot be empty");
      return;
    }
    onSave(question, answer);
    // Parent will handle closing and resetting after successful save.
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add New FAQ</DialogTitle>
        <DialogDescription>
          Create a new frequently asked question for your customers.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label htmlFor="add-question" className="text-sm font-medium">
            Question
          </label>
          <Input
            id="add-question"
            placeholder="Enter the question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="add-answer" className="text-sm font-medium">
            Answer
          </label>
          <Textarea
            id="add-answer"
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
        <Button onClick={handleSubmit}>Save</Button>
      </DialogFooter>
    </>
  );
}
