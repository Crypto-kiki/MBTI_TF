export const runtime = 'edge';

export async function GET(request: Request, { params }: { params: { locale: string; resultType: string } }) {
  const url = new URL(request.url);
  url.pathname = `/${params.locale}/series/core/result/${params.resultType}/share-image`;
  return Response.redirect(url.toString(), 307);
}
