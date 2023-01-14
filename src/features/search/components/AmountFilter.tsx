import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useQueryParam, NumericObjectParam } from "use-query-params";

import Button from "@/components/Button";
import ChipFilterMenu from "@/components/ChipFilterMenu";
import Divider from "@/components/Divider";

interface Inputs {
  above: number;
  below: number;
}

export function AmountFilter() {
  const [filterAmount, setFilterAmount] = useQueryParam(
    "amount",
    NumericObjectParam
  );
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = ({ above, below }) => {
    if (!above && !below) {
      setFilterAmount(null);
      return;
    }
    setFilterAmount({ above, below });
  };
  const handleReset = () => {
    setFilterAmount(null, "replaceIn");
    reset();
  };

  useEffect(() => {
    if (filterAmount?.above) {
      setValue("above", filterAmount.above);
    }
    if (filterAmount?.below) {
      setValue("below", filterAmount.below);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChipFilterMenu
      label={`總計 ${filterAmount?.above || "0"} - ${
        filterAmount?.below || "∞"
      } 元`}
      isOn={!!filterAmount}
    >
      <div className="flex flex-col gap-2">
        <div className="m-2 flex h-8 gap-2">
          <form className="flex" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="number"
              placeholder="0"
              className="w-20 rounded px-1 text-right dark:bg-neutral-800"
              {...register("above", {
                min: { value: 0, message: "最小值須不為負。" },
                validate: {
                  lessThenMax: (value) =>
                    !getValues().below ||
                    +value <= +getValues().below ||
                    "最小值須不大於最大值。",
                },
              })}
            />
            <span className="mx-2 self-center">-</span>
            <input
              type="number"
              placeholder="∞"
              className="w-20 rounded px-1 text-right dark:bg-neutral-800"
              {...register("below", {
                min: {
                  value: 0,
                  message: "最大值須不為負。",
                },
              })}
            />
          </form>
        </div>
        <Divider />
        {errors && (
          <div className="text-small px-2 text-sm text-red-500">
            <p>{errors.above?.message}</p>
            <p>{errors.below?.message}</p>
          </div>
        )}
        <div className="flex justify-end px-2">
          <Button label="清除" onClick={() => handleReset()} />
          <Button label="確定" onClick={() => handleSubmit(onSubmit)()} />
        </div>
      </div>
    </ChipFilterMenu>
  );
}
