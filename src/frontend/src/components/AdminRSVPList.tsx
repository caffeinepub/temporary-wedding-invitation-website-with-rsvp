import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useGetAllRSVPs, useGetInviteCodes, useGenerateInviteCode } from '../hooks/useQueries';
import { Copy, Plus, Loader2, Users, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function AdminRSVPList() {
  const { data: rsvps, isLoading: rsvpsLoading } = useGetAllRSVPs();
  const { data: inviteCodes, isLoading: codesLoading } = useGetInviteCodes();
  const generateInviteCode = useGenerateInviteCode();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const unusedCodes = inviteCodes?.filter((code) => !code.used) || [];

  // Sort RSVPs by timestamp (newest first)
  const sortedRSVPs = rsvps
    ? [...rsvps].sort((a, b) => Number(b.timestamp - a.timestamp))
    : [];

  const handleCopyLink = (code: string) => {
    const link = `${window.location.origin}?code=${code}`;
    navigator.clipboard.writeText(link);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleGenerateCode = () => {
    generateInviteCode.mutate();
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp / BigInt(1000000)));
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-rose-900 mb-2">Admin Dashboard</h1>
          <p className="text-rose-700">Manage RSVPs and invite codes</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-rose-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-rose-700 mb-1">Total RSVPs</p>
                  <p className="text-3xl font-bold text-rose-900">{rsvps?.length || 0}</p>
                </div>
                <Users className="w-10 h-10 text-rose-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-rose-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-rose-700 mb-1">Unused Codes</p>
                  <p className="text-3xl font-bold text-rose-900">{unusedCodes.length}</p>
                </div>
                <Calendar className="w-10 h-10 text-rose-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invite Codes */}
        <Card className="mb-8 border-rose-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-rose-900">Invite Codes</CardTitle>
                <CardDescription>Generate and share invite links with guests</CardDescription>
              </div>
              <Button
                onClick={handleGenerateCode}
                disabled={generateInviteCode.isPending}
                className="bg-rose-600 hover:bg-rose-700"
              >
                {generateInviteCode.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Generate Code
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {codesLoading ? (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-rose-400" />
              </div>
            ) : unusedCodes.length === 0 ? (
              <p className="text-center text-rose-700 py-8">
                No unused invite codes. Generate one to get started.
              </p>
            ) : (
              <div className="space-y-3">
                {unusedCodes.map((code) => (
                  <div
                    key={code.code}
                    className="flex items-center justify-between p-4 bg-rose-50 rounded-lg border border-rose-200"
                  >
                    <div className="flex-1">
                      <code className="text-sm font-mono text-rose-900 bg-white px-3 py-1 rounded border border-rose-200">
                        {code.code}
                      </code>
                    </div>
                    <Button
                      onClick={() => handleCopyLink(code.code)}
                      variant="outline"
                      size="sm"
                      className="ml-4 border-rose-300 text-rose-700 hover:bg-rose-100"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copiedCode === code.code ? 'Copied!' : 'Copy Link'}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* RSVPs List */}
        <Card className="border-rose-200">
          <CardHeader>
            <CardTitle className="text-2xl text-rose-900">RSVP Responses</CardTitle>
            <CardDescription>All guest responses in chronological order</CardDescription>
          </CardHeader>
          <CardContent>
            {rsvpsLoading ? (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-rose-400" />
              </div>
            ) : sortedRSVPs.length === 0 ? (
              <p className="text-center text-rose-700 py-8">No RSVPs yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-rose-900">Name</TableHead>
                      <TableHead className="text-rose-900">Invite Code</TableHead>
                      <TableHead className="text-rose-900">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedRSVPs.map((rsvp, index) => (
                      <TableRow key={`${rsvp.inviteCode}-${index}`}>
                        <TableCell className="font-medium text-rose-900">{rsvp.name}</TableCell>
                        <TableCell>
                          <code className="text-xs font-mono text-rose-700 bg-rose-50 px-2 py-1 rounded">
                            {rsvp.inviteCode}
                          </code>
                        </TableCell>
                        <TableCell className="text-rose-700">{formatDate(rsvp.timestamp)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
