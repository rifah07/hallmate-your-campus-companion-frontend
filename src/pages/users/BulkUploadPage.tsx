import { useState, useCallback } from 'react';
import { Upload, Download, FileSpreadsheet, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function BulkUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{ row: number; name: string; status: 'success' | 'error'; message: string }[] | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const { toast } = useToast();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  }, []);

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setUploading(false);
          setResults([
            { row: 1, name: 'Sadia Akter', status: 'success', message: 'Created' },
            { row: 2, name: 'Maryam Khan', status: 'success', message: 'Created' },
            { row: 3, name: 'Fatema Noor', status: 'error', message: 'Duplicate University ID' },
            { row: 4, name: 'Taslima Begum', status: 'success', message: 'Created' },
            { row: 5, name: '', status: 'error', message: 'Name is required' },
          ]);
          toast({ title: 'Upload Complete', description: '3 of 5 records processed successfully' });
          return 100;
        }
        return p + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Bulk Upload Users</h1>
        <p className="text-muted-foreground">Import multiple users from a spreadsheet</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Download Template</CardTitle>
          <CardDescription>Use this template to format your data correctly</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Download Excel Template</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Upload File</CardTitle></CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors ${dragOver ? 'border-primary bg-primary/5' : 'border-border'}`}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <FileSpreadsheet className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium">{file ? file.name : 'Drag & drop your file here'}</p>
            <p className="text-xs text-muted-foreground mt-1">Supports .xlsx, .csv (max 5MB)</p>
            <label className="mt-4 inline-block">
              <input type="file" className="hidden" accept=".xlsx,.csv" onChange={e => { if (e.target.files?.[0]) setFile(e.target.files[0]); }} />
              <Button variant="outline" size="sm" asChild><span>Browse Files</span></Button>
            </label>
          </div>

          {file && !results && (
            <div className="mt-4 space-y-3">
              {uploading && <Progress value={progress} className="h-2" />}
              <Button onClick={handleUpload} disabled={uploading} className="w-full">
                <Upload className="mr-2 h-4 w-4" /> {uploading ? `Uploading... ${progress}%` : 'Upload'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader><CardTitle className="text-base">Results</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow><TableHead>Row</TableHead><TableHead>Name</TableHead><TableHead>Status</TableHead><TableHead>Message</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {results.map(r => (
                  <TableRow key={r.row}>
                    <TableCell>{r.row}</TableCell>
                    <TableCell>{r.name || '—'}</TableCell>
                    <TableCell>
                      {r.status === 'success'
                        ? <Badge className="bg-success/15 text-success"><CheckCircle className="h-3 w-3 mr-1" /> Success</Badge>
                        : <Badge className="bg-destructive/15 text-destructive"><XCircle className="h-3 w-3 mr-1" /> Error</Badge>}
                    </TableCell>
                    <TableCell className="text-sm">{r.message}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button variant="outline" size="sm" className="mt-4"><Download className="mr-2 h-4 w-4" /> Download Error Report</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
