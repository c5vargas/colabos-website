import { useLinks } from '../hooks/useLinks';
import LinkCardItem from './LinkCardItem';

interface LinksCardListProps {
  cardStyle: 'details' | 'modern';
}

const LinksCardList: React.FC<LinksCardListProps> = ({ cardStyle }) => {
  const { links, handleRemove } = useLinks();

  const gridClassName =
    cardStyle === 'modern'
      ? 'grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-12'
      : 'grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

  return (
    <section className="rounded-2xl py-8">
      <div className={gridClassName}>
        {links.map((link) => (
          <LinkCardItem link={link} key={link.id} style={cardStyle} onDelete={handleRemove} />
        ))}
      </div>
    </section>
  );
};

export default LinksCardList;
