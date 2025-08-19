import { arrayToTree } from '@dimjs/utils';
import { BlockCollectionItem } from './BlockCollectionItem';

export type BlockCollectionProps = {
  collections: Array<BlockCollectionItem>;
};

export const BlockCollection = ({ collections }: BlockCollectionProps) => {
  const treeRoot = arrayToTree<BlockCollectionItem, 'children'>(collections);
  return (
    <div className="my-2">
      {treeRoot.children.map((item) => {
        return <BlockCollectionItem key={item.id} catalogTree={item} />;
      })}
    </div>
  );
};
