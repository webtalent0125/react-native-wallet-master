import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Pressable, Dimensions } from 'react-native';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
  monotoneCubicInterpolation,
} from '@rainbow-me/animated-charts';
import axios from 'axios';
import { Icon } from 'react-native-eva-icons';
import { ApplicationProperties } from '../../ApplicationProperties';
import { styles } from './styles';

const PriceChart = (props) => {
  const { quotes } = props;
  const { currency } = useSelector((state) => state.CurrencyReducer);

  const periods = ['1D', '1W', '1M', '2M', 'ALL'];
  const percentArray = {
    '1D': 'percent_change_24h',
    '1W': 'percent_change_7d',
    '1M': 'percent_change_30d',
    '2M': 'percent_change_60d',
    ALL: 'percent_change_90d',
  };
  const rangeArray = {
    '1D': '1',
    '1W': '7',
    '1M': '30',
    '2M': '60',
    ALL: 'max',
  };
  const coingeckoAPI = ApplicationProperties.COINGECKO_API_URL;
  const { width: SIZE } = Dimensions.get('window');

  const [selectedPeriod, setSelectedPeriod] = useState('1D');
  const [priceData, setpriceData] = useState([
    { x: 1453075200, y: 0 },
    { x: 1453075300, y: 0.5 },
    { x: 1454198400, y: 1.2 },
  ]);
  // const [points, setpoints] = useState(monotoneCubicInterpolation({ data, range: 40 }));

  useEffect(async () => {
    try {
      const { data } = await axios.get(
        coingeckoAPI +
          'coins/exzocoin/market_chart?vs_currency=usd&days=' +
          rangeArray[selectedPeriod]
      );
      const priceData = [];
      const prices = data.prices;
      for (let i = 0; i < prices.length; i++) {
        const priceItem = {
          x: prices[i][0],
          y: prices[i][1],
        };
        priceData.push(priceItem);
      }
      setpriceData(priceData);
    } catch (error) {
      console.log(error.message);
    }
  }, [selectedPeriod]);

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text
          style={[
            styles.marketPrice,
            quotes['EXZO'].quote.USD[percentArray[selectedPeriod]] > 0
              ? styles.priceup
              : styles.pricedown,
          ]}
        >
          {currency.symbol}
          {quotes['EXZO'].quote.USD.price.toFixed(5)}{' '}
          {quotes['EXZO'].quote.USD[percentArray[selectedPeriod]] > 0 ? (
            <Icon name="arrow-up" width={12} height={12} fill="#3DEC8D" />
          ) : (
            <Icon
              name="arrow-down"
              width={12}
              height={12}
              fill="rgba(252, 48, 68, 1)"
            />
          )}{' '}
          {quotes['EXZO'].quote.USD[percentArray[selectedPeriod]].toFixed(2)}
          {'%'}
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <ChartPathProvider
          data={{
            points: monotoneCubicInterpolation({ data: priceData, range: 40 }),
            smoothingStrategy: 'bezier',
          }}
        >
          <ChartPath
            height={SIZE / 3}
            strokeWidth="3"
            selectedStrokeWidth="2"
            stroke={
              quotes['EXZO'].quote.USD[percentArray[selectedPeriod]] > 0
                ? 'rgba(50, 204, 134, 1)'
                : 'red'
            }
            width={SIZE - 30}
          />
          <ChartDot
            style={{
              backgroundColor:
                quotes['EXZO'].quote.USD[percentArray[selectedPeriod]] > 0
                  ? 'rgba(50, 204, 134, 1)'
                  : 'red',
            }}
          />
        </ChartPathProvider>
        <View style={styles.periodButtonGroup}>
          {periods.map((period, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => setSelectedPeriod(period)}
                style={[
                  styles.periodButton,
                  selectedPeriod === period && {
                    backgroundColor:
                      quotes['EXZO'].quote.USD[percentArray[selectedPeriod]] > 0
                        ? 'rgba(61, 236, 141, 0.35)'
                        : 'rgba(252, 48, 68, 0.35)',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.periodText,
                    selectedPeriod === period && {
                      color:
                        quotes['EXZO'].quote.USD[percentArray[selectedPeriod]] >
                        0
                          ? 'rgba(61, 236, 141, 1)'
                          : 'rgba(252, 48, 68, 1)',
                    },
                  ]}
                >
                  {period}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default PriceChart;
