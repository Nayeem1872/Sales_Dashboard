"use client"

import { useState, useEffect } from "react"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface FAQ {
  id: string
  question: string
  answer: string
}

export default function FAQSettingsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: "1",
      question: "How do I track my order?",
      answer:
        "You can track your order by logging into your account and visiting the 'Orders' section. There you'll find all your orders and their current status.",
    },
    {
      id: "2",
      question: "What payment methods do you accept?",
      answer:
        "We accept credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely.",
    },
    {
      id: "3",
      question: "How can I request a refund?",
      answer:
        "To request a refund, please contact our customer support team within 30 days of purchase. You'll need to provide your order number and reason for the refund.",
    },
  ])

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentFAQ, setCurrentFAQ] = useState<FAQ | null>(null)
  const [newQuestion, setNewQuestion] = useState("")
  const [newAnswer, setNewAnswer] = useState("")
  const { toast } = useToast()

  // Load FAQs from localStorage on component mount
  useEffect(() => {
    const savedFAQs = localStorage.getItem("faqs")
    if (savedFAQs) {
      setFaqs(JSON.parse(savedFAQs))
    }
  }, [])

  // Save FAQs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("faqs", JSON.stringify(faqs))
  }, [faqs])

  const handleAddFAQ = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      toast({
        title: "Error",
        description: "Question and answer cannot be empty",
        variant: "destructive",
      })
      return
    }

    const newFAQ: FAQ = {
      id: Date.now().toString(),
      question: newQuestion,
      answer: newAnswer,
    }

    setFaqs([...faqs, newFAQ])
    setNewQuestion("")
    setNewAnswer("")
    setIsAddModalOpen(false)

    toast({
      title: "FAQ Added",
      description: "The FAQ has been added successfully",
    })
  }

  const handleEditFAQ = () => {
    if (!currentFAQ || !currentFAQ.question.trim() || !currentFAQ.answer.trim()) {
      toast({
        title: "Error",
        description: "Question and answer cannot be empty",
        variant: "destructive",
      })
      return
    }

    setFaqs(faqs.map((faq) => (faq.id === currentFAQ.id ? currentFAQ : faq)))
    setIsEditModalOpen(false)
    setCurrentFAQ(null)

    toast({
      title: "FAQ Updated",
      description: "The FAQ has been updated successfully",
    })
  }

  const handleDeleteFAQ = (id: string) => {
    setFaqs(faqs.filter((faq) => faq.id !== id))

    toast({
      title: "FAQ Deleted",
      description: "The FAQ has been deleted successfully",
    })
  }

  const openEditModal = (faq: FAQ) => {
    setCurrentFAQ(faq)
    setIsEditModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">FAQ Settings</h1>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New FAQ</DialogTitle>
              <DialogDescription>Create a new frequently asked question for your customers.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="question" className="text-sm font-medium">
                  Question
                </label>
                <Input
                  id="question"
                  placeholder="Enter the question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="answer" className="text-sm font-medium">
                  Answer
                </label>
                <Textarea
                  id="answer"
                  placeholder="Enter the answer"
                  rows={4}
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddFAQ}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit FAQ</DialogTitle>
              <DialogDescription>Update this frequently asked question.</DialogDescription>
            </DialogHeader>
            {currentFAQ && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="edit-question" className="text-sm font-medium">
                    Question
                  </label>
                  <Input
                    id="edit-question"
                    placeholder="Enter the question"
                    value={currentFAQ.question}
                    onChange={(e) => setCurrentFAQ({ ...currentFAQ, question: e.target.value })}
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
                    value={currentFAQ.answer}
                    onChange={(e) => setCurrentFAQ({ ...currentFAQ, answer: e.target.value })}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditFAQ}>Update</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Manage the FAQs displayed on your website</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Question</TableHead>
                <TableHead>Answer</TableHead>
                <TableHead className="text-right w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqs.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell className="font-medium">{faq.question}</TableCell>
                  <TableCell className="max-w-md truncate">{faq.answer}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditModal(faq)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteFAQ(faq.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
