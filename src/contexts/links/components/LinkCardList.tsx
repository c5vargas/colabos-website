import { updateMultiplePositions } from '@/contexts/links/actions/updateMultiplePositions';
import LinkCardItem from '@/contexts/links/components/LinkCardItem';
import { useLinks } from '@/contexts/links/hooks/useLinks';
import type { Link } from '@/contexts/links/libs/types';
import { useAuth } from '@clerk/clerk-react';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { useEffect } from 'react';

interface LinksCardListProps {
  cardStyle: 'details' | 'modern';
}

const LinksCardList: React.FC<LinksCardListProps> = ({ cardStyle }) => {
  const { links, handleRemove, loadLinks } = useLinks();
  const { getToken } = useAuth();

  const [parent, sortedLinks, setSortedLinks] = useDragAndDrop<HTMLDivElement, Link>(links);

  const handleDragEnd = async (newOrder: typeof links) => {
    try {
      const token = await getToken();

      const positionUpdates = newOrder.map((link, index) => ({
        id: link.id,
        position: index,
      }));

      await updateMultiplePositions(token, positionUpdates);

      loadLinks();
    } catch (error) {
      console.error('Error al actualizar las posiciones:', error);
    }
  };

  useEffect(() => {
    setSortedLinks(links);
  }, [links, setSortedLinks]);

  useEffect(() => {
    if (links.length > 0 && sortedLinks.length === 0) {
      setSortedLinks(links);
    }
  }, [links, sortedLinks.length, setSortedLinks]);

  useEffect(() => {
    if (sortedLinks.length > 0 && JSON.stringify(links) !== JSON.stringify(sortedLinks)) {
      handleDragEnd(sortedLinks as Link[]);
    }
  }, [sortedLinks]);

  const gridClassName =
    cardStyle === 'modern'
      ? 'grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-12'
      : 'grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

  return (
    <section className="rounded-2xl py-8">
      <div ref={parent} className={gridClassName}>
        {sortedLinks.map((link) => (
          <div key={link.id} data-id={link.id} className="cursor-move">
            <LinkCardItem link={link} style={cardStyle} onDelete={handleRemove} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LinksCardList;
