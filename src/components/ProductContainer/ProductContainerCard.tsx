import Typography from "@components/Typography";
import { currencyMap } from "@utils/CurrencyMap";
import type { FunctionComponent } from "preact";
import region from "@api/region";
import type { CurrencyMap } from "@utils/CurrencyMap";
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

type TProductContainerCard = {
  product: PricedProduct;
};

const ProductContainerCard: FunctionComponent<TProductContainerCard> = ({ product }) => {

  const currency = region.selectedCountry.value?.region.currency_code as keyof CurrencyMap;

  const amount = product.variants?.[0]?.prices?.find((item) => item.currency_code === currency)?.amount;
  
  return (
    <a href={`/products/${product.id}`}>
      <div class="card">
        <div class="group relative">
          <div class="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
            <img
              src={product.thumbnail ?? undefined}
              alt={product.title}
              class="h-full w-full object-cover object-center"
            />
          </div>
          <Typography size="body2/medium" variant="secondary" className="mt-4">
            <span class="absolute inset-0"></span>
            {product.title}
          </Typography>
          <Typography size="body2/normal" variant="secondary" className="mt-1 ">
            {product.description?.slice(0, 30) + "..." ||
              "Description not available"}
          </Typography>
          <Typography size="body2/medium" variant="primary" className="mt-1 ">
            {currency ? currencyMap[currency] : ''}
            {amount ? (amount / 100).toFixed(2) : "Price not available"}
          </Typography>
        </div>
      </div>
    </a>
  );
};

export default ProductContainerCard;
