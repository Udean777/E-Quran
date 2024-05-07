import {View, Text} from 'react-native';
import React from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {Divider} from 'react-native-paper';

const BottomSheetComp = ({
  bottomSheetRef,
  snapPoints,
  styles,
  detailSurah,
  selectedAyat,
  tafsirData,
}: {
  bottomSheetRef: any;
  snapPoints: any;
  styles: any;
  detailSurah: any;
  selectedAyat: any;
  tafsirData: any;
}) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backgroundStyle={{borderRadius: 0}}
      handleIndicatorStyle={{display: 'none'}}
      backdropComponent={backdrop => (
        <BottomSheetBackdrop {...backdrop} enableTouchThrough />
      )}>
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <Text style={styles.textTafsir}>
          Tafsir {detailSurah?.namaLatin} Ayat {selectedAyat}
        </Text>

        <Divider style={{marginVertical: 10}} />

        {selectedAyat && tafsirData[selectedAyat] ? (
          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            {tafsirData[selectedAyat].map(
              (tafsirText: string, index: number) => (
                <Text key={index} style={{marginBottom: 10, color: '#333'}}>
                  {tafsirText}
                </Text>
              ),
            )}
          </BottomSheetScrollView>
        ) : (
          <Text>No tafsir available</Text>
        )}
      </View>
    </BottomSheet>
  );
};

export default BottomSheetComp;
