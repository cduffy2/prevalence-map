import SecondaryNav from '@/app/components/SecondaryNav';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import { segmentMetadata } from '@/lib/segmentMetadata';

export default async function SegmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Get segment metadata
  const segment = segmentMetadata[id.split('-').map((part, index) =>
    index === 0 ? part.charAt(0).toUpperCase() + part.slice(1) : part
  ).join('-')];

  if (!segment) {
    return <div>Segment not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SecondaryNav showSegmentCards={true} activeSegment={id} />

      <main className="flex-1" style={{ minHeight: '1200px' }}>
        <div className="max-w-[1360px] mx-auto px-7 py-8">
          {/* Segment Header */}
          <div className="flex items-center gap-6 mb-8">
            {/* Illustration */}
            <div className="flex-shrink-0">
              <Image
                src={`/Assets/illustrations/${segment.segmentId}.png`}
                alt={segment.displayName}
                width={106}
                height={106}
                className="object-contain"
              />
            </div>

            {/* Segment name and tags */}
            <div>
              <h1 className="text-2xl font-semibold mb-3">{segment.displayName}</h1>
              <div className="flex flex-wrap gap-2">
                {segment.characteristics.map((characteristic, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs"
                    style={{
                      backgroundColor: '#e5e5dc',
                      color: '#383633',
                      border: 'none',
                      borderRadius: '24px',
                      fontWeight: 600
                    }}
                  >
                    {characteristic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content placeholder */}
          <p className="text-lg">Segment profile goes here</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
