import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State, withRedux } from "~/domains";
import { actions as uiActions } from "~/domains/ui/actions";
import { Popup } from "~/components/Popup";

export const Common = withRedux(() => {
  const dispatch = useDispatch();
  const { isImageLoadError } = useSelector(({ ui }: State) => ui);

  const handleOnClickResolveImageLoadError = useCallback(
    () => dispatch(uiActions.imageLoadError(false)),
    []
  );

  return (
    <>
      {isImageLoadError && (
        <Popup
          characterImageUrl="https://static.calmery.moe/s/2/6.png"
          onEnter={handleOnClickResolveImageLoadError}
        >
          画像の読み込みに失敗しました...！
          <br />
          何度も失敗するときは別の画像で試してみてね
        </Popup>
      )}
    </>
  );
});
