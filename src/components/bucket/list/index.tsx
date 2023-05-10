import { getBucketList, getObjectList } from '@/client';
import { useAccount } from 'wagmi';

export const BucketList = () => {
  const {address} = useAccount();

  return (
    <div>
      <h4>bucket list</h4>
      <div>
        <button
          onClick={async () => {
            const bucketList = await getBucketList(address);
            const objectList = await getObjectList(bucketList.buckets[1].bucket_info.bucket_name)
            console.log(bucketList, objectList);
          }}
        >
          get bucket list
        </button>
      </div>
    </div>
  );
};
