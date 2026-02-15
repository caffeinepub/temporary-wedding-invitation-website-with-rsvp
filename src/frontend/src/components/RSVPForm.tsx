import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSubmitRSVP } from '../hooks/useQueries';
import { CheckCircle2, Loader2 } from 'lucide-react';
import SectionOrnaments from './SectionOrnaments';

export default function RSVPForm() {
  const [name, setName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitRSVP = useSubmitRSVP();

  // Auto-populate invite code from URL
  useEffect(() => {
    const codeFromUrl = new URLSearchParams(window.location.search).get('code');
    if (codeFromUrl) setInviteCode(codeFromUrl);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !inviteCode.trim()) {
      return;
    }

    submitRSVP.mutate(
      {
        name: name.trim(),
        inviteCode: inviteCode.trim(),
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          // Reset form
          setName('');
          setInviteCode('');
          setNote('');
        },
      }
    );
  };

  if (submitted && !submitRSVP.isError) {
    return (
      <section className="py-16 px-4 bg-gradient-to-b from-white to-rose-50">
        <div className="container mx-auto max-w-2xl">
          <Card className="border-rose-200 shadow-xl">
            <CardContent className="p-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="font-serif text-3xl text-rose-900 mb-4">Thank You!</h3>
              <p className="text-lg text-rose-800">
                Your RSVP has been received. We look forward to celebrating with you!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-rose-50">
      <div className="container mx-auto max-w-2xl">
        <SectionOrnaments position="top" />

        <Card className="border-rose-200 shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="font-serif text-4xl text-rose-900 mb-2">RSVP</CardTitle>
            <CardDescription className="text-lg text-rose-700">
              Please confirm your attendance
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-rose-900 font-medium">
                  Your Name <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                />
              </div>

              {/* Invite Code */}
              <div className="space-y-2">
                <Label htmlFor="inviteCode" className="text-rose-900 font-medium">
                  Invite Code <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="inviteCode"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="Enter your invite code"
                  required
                  className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                />
              </div>

              {/* Note (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="note" className="text-rose-900 font-medium">
                  Message (Optional)
                </Label>
                <Textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Any dietary restrictions or special requests?"
                  rows={4}
                  className="border-rose-200 focus:border-rose-400 focus:ring-rose-400 resize-none"
                />
              </div>

              {/* Error Message */}
              {submitRSVP.isError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">
                    {submitRSVP.error instanceof Error
                      ? submitRSVP.error.message
                      : 'Failed to submit RSVP. Please check your invite code and try again.'}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={submitRSVP.isPending || !name.trim() || !inviteCode.trim()}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-6 text-lg font-medium"
              >
                {submitRSVP.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit RSVP'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <SectionOrnaments position="bottom" />
      </div>
    </section>
  );
}
