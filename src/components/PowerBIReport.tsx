import React, { useState, useEffect } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

type EmbedTokenResponse = {
    embedUrl: string;
    embedToken: string;
};

const PowerBIReport: React.FC<{ reportId: string }> = ({ reportId }) => {
    const [embedConfig, setEmbedConfig] = useState<models.IEmbedConfiguration>();

    useEffect(() => {
        const fetchEmbedToken = async () => {
            try {
                // const response = await fetch(`http://localhost:3001/getReportEmbeddedToken`);
                // if (!response.ok) {
                //     throw new Error(`Network response was not ok, status: ${response.status}`);
                // }
                // const data: EmbedTokenResponse = await response.json();
                setEmbedConfig({
                    type: 'report',
                    id: "6c79ce1c-ff65-4768-9119-1a1393de35df",//reportId,
                    embedUrl: "https://app.powerbi.com/reportEmbed?reportId=6c79ce1c-ff65-4768-9119-1a1393de35df&groupId=ec2da170-1590-4af2-bb68-27d4ad5154d9&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUFGUklDQS1OT1JUSC1BLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7InVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlLCJkaXNhYmxlQW5ndWxhckpTQm9vdHN0cmFwUmVwb3J0RW1iZWQiOnRydWV9fQ%3d%3d",//data.embedUrl,
                    tokenType: models.TokenType.Aad,
                    accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlhSdmtvOFA3QTNVYVdTblU3Yk05blQwTWpoQSIsImtpZCI6IlhSdmtvOFA3QTNVYVdTblU3Yk05blQwTWpoQSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYjY0MjMxNDItMjM2OS00ZTI5LTlkZmMtMzk5OTg4Yjg0Mzg0LyIsImlhdCI6MTcxMTQ0NDM5OSwibmJmIjoxNzExNDQ0Mzk5LCJleHAiOjE3MTE0NDg1NDcsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84V0FBQUFuOUZ2dS8yaVZxMktFeE1QWk9ETXdSV2dEU0FjbjRsQ051LytnbThIcHZtOG5ScVgvOGZvVVhMQ29iT0ZybStLIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiU2V4d2FsZSIsImdpdmVuX25hbWUiOiJBbGV4IiwiaXBhZGRyIjoiMTAyLjMzLjQ0LjE1MSIsIm5hbWUiOiJBbGV4IFNleHdhbGUiLCJvaWQiOiI2Yzg3NTRhMS03MzNlLTQ5MTYtOGEzYy1hZTYwOGVlZmFjNTUiLCJwdWlkIjoiMTAwMzIwMDM2MjMzQkNEQyIsInJoIjoiMC5BVTRBUWpGQ3Rta2pLVTZkX0RtWmlMaERoQWtBQUFBQUFBQUF3QUFBQUFBQUFBQ0RBQWcuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoidUJtc0ljaDJBeXRCcHhta2t4SmFEdG9sb1hZWlN3R2JRcWg2N011RmFzNCIsInRpZCI6ImI2NDIzMTQyLTIzNjktNGUyOS05ZGZjLTM5OTk4OGI4NDM4NCIsInVuaXF1ZV9uYW1lIjoiYWxleEBmeGZsb3cuY28iLCJ1cG4iOiJhbGV4QGZ4Zmxvdy5jbyIsInV0aSI6ImhUSWJIVVZsSUV5bnhyVnJ2c3dkQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjliODk1ZDkyLTJjZDMtNDRjNy05ZDAyLWE2YWMyZDVlYTVjMyIsIjExNjQ4NTk3LTkyNmMtNGNmMy05YzM2LWJjZWJiMGJhOGRjYyIsIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.Fw_zrLFRb5uuU-fue3zajrolsc8DAVpQEV-lX_jxWC2bhIVpCoBghl81efvLzsm5BGt0IJE3woIALR0QrpwOQCu3o40N-J-efrjBlExbiOXnLVXGqJKlHg2ASCBoXvHY-YGsR0URi6e7K07vzQnWYqpJumGpjKhS-ZDnG3LNkDQdxVM-azz0FKnahH8o-DrZWWc2mKSXNrex6uY0XB1mckOjmKkP1VPjnVbJt5CIF_vDeyR6cEKPSToCbIotHoViGqmLelIDw1nnmkE-YnZXESNg-nYwN7ROH2sHXjZj7emt2izkZCEdhh-_jJlUNUML5rcOjknOeEImPysrm4Eo8QeyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlhSdmtvOFA3QTNVYVdTblU3Yk05blQwTWpoQSIsImtpZCI6IlhSdmtvOFA3QTNVYVdTblU3Yk05blQwTWpoQSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYjY0MjMxNDItMjM2OS00ZTI5LTlkZmMtMzk5OTg4Yjg0Mzg0LyIsImlhdCI6MTcxMTQ0ODAwNywibmJmIjoxNzExNDQ4MDA3LCJleHAiOjE3MTE0NTM1NDksImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84V0FBQUFUaWZKVHRHbEdWUUNLMkJUWTJXb3hsWW9vRENKQXZTU2drMWh1MjR6RW81QWNodXd0YzcyQW15bjlaQU03ZlFLIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiU2V4d2FsZSIsImdpdmVuX25hbWUiOiJBbGV4IiwiaXBhZGRyIjoiMTAyLjMzLjQ0LjE1MSIsIm5hbWUiOiJBbGV4IFNleHdhbGUiLCJvaWQiOiI2Yzg3NTRhMS03MzNlLTQ5MTYtOGEzYy1hZTYwOGVlZmFjNTUiLCJwdWlkIjoiMTAwMzIwMDM2MjMzQkNEQyIsInJoIjoiMC5BVTRBUWpGQ3Rta2pLVTZkX0RtWmlMaERoQWtBQUFBQUFBQUF3QUFBQUFBQUFBQ0RBQWcuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoidUJtc0ljaDJBeXRCcHhta2t4SmFEdG9sb1hZWlN3R2JRcWg2N011RmFzNCIsInRpZCI6ImI2NDIzMTQyLTIzNjktNGUyOS05ZGZjLTM5OTk4OGI4NDM4NCIsInVuaXF1ZV9uYW1lIjoiYWxleEBmeGZsb3cuY28iLCJ1cG4iOiJhbGV4QGZ4Zmxvdy5jbyIsInV0aSI6IkRYV3UyWDBOVzBLUFdfcmhtU2o5QUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjliODk1ZDkyLTJjZDMtNDRjNy05ZDAyLWE2YWMyZDVlYTVjMyIsIjExNjQ4NTk3LTkyNmMtNGNmMy05YzM2LWJjZWJiMGJhOGRjYyIsIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.FwbZUMWBf0rV2pxNaAspK6qSrZ9V0NClRaUdeDqYjnNDkMC_0FIboVt0Yl4MtJKrudup1h48b6UIGpyLgX6z13hqmOKGO8lG8bb1i2Xni-229mz-esEmmPX8I2OZ1mgjtxXrO6PK-5jgRjvKIIK_Yh-6mYEbYBtxx4SaRx3th-h_DzbaZ8v58RHW7KhpoddQx1rPPhwrhvZ2AOwcLIgIIpMBuGLlVx0rzq6MAPE08I4OUYfGPCyolK6FsOQz20VjFlB9aENQYapcKS6_eXmPBqBHmhvnhUisFBtysTbxDKNGMVTe_MNfHcrVUsJ74bZ8hVnGqdiy2yEWS48jI19LzQeyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlhSdmtvOFA3QTNVYVdTblU3Yk05blQwTWpoQSIsImtpZCI6IlhSdmtvOFA3QTNVYVdTblU3Yk05blQwTWpoQSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYjY0MjMxNDItMjM2OS00ZTI5LTlkZmMtMzk5OTg4Yjg0Mzg0LyIsImlhdCI6MTcxMTQ0ODAwNywibmJmIjoxNzExNDQ4MDA3LCJleHAiOjE3MTE0NTM1NDksImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84V0FBQUFUaWZKVHRHbEdWUUNLMkJUWTJXb3hsWW9vRENKQXZTU2drMWh1MjR6RW81QWNodXd0YzcyQW15bjlaQU03ZlFLIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiU2V4d2FsZSIsImdpdmVuX25hbWUiOiJBbGV4IiwiaXBhZGRyIjoiMTAyLjMzLjQ0LjE1MSIsIm5hbWUiOiJBbGV4IFNleHdhbGUiLCJvaWQiOiI2Yzg3NTRhMS03MzNlLTQ5MTYtOGEzYy1hZTYwOGVlZmFjNTUiLCJwdWlkIjoiMTAwMzIwMDM2MjMzQkNEQyIsInJoIjoiMC5BVTRBUWpGQ3Rta2pLVTZkX0RtWmlMaERoQWtBQUFBQUFBQUF3QUFBQUFBQUFBQ0RBQWcuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoidUJtc0ljaDJBeXRCcHhta2t4SmFEdG9sb1hZWlN3R2JRcWg2N011RmFzNCIsInRpZCI6ImI2NDIzMTQyLTIzNjktNGUyOS05ZGZjLTM5OTk4OGI4NDM4NCIsInVuaXF1ZV9uYW1lIjoiYWxleEBmeGZsb3cuY28iLCJ1cG4iOiJhbGV4QGZ4Zmxvdy5jbyIsInV0aSI6IkRYV3UyWDBOVzBLUFdfcmhtU2o5QUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjliODk1ZDkyLTJjZDMtNDRjNy05ZDAyLWE2YWMyZDVlYTVjMyIsIjExNjQ4NTk3LTkyNmMtNGNmMy05YzM2LWJjZWJiMGJhOGRjYyIsIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.FwbZUMWBf0rV2pxNaAspK6qSrZ9V0NClRaUdeDqYjnNDkMC_0FIboVt0Yl4MtJKrudup1h48b6UIGpyLgX6z13hqmOKGO8lG8bb1i2Xni-229mz-esEmmPX8I2OZ1mgjtxXrO6PK-5jgRjvKIIK_Yh-6mYEbYBtxx4SaRx3th-h_DzbaZ8v58RHW7KhpoddQx1rPPhwrhvZ2AOwcLIgIIpMBuGLlVx0rzq6MAPE08I4OUYfGPCyolK6FsOQz20VjFlB9aENQYapcKS6_eXmPBqBHmhvnhUisFBtysTbxDKNGMVTe_MNfHcrVUsJ74bZ8hVnGqdiy2yEWS48jI19LzQ",//data.embedToken,
                    settings: {
                        filterPaneEnabled: false,
                        navContentPaneEnabled: false,
                    },
                });
            } catch (error) {
                console.error('Error fetching embed token:', error);
            }
        };

        fetchEmbedToken();
    }, [reportId]);

    // Event handlers
    const eventHandlers = new Map([
        ['loaded', () => console.log('Report loaded')],
        ['rendered', () => console.log('Report rendered')],
        ['error', (error: any) => console.error('Report error', error)],
    ]);

    return (
        <div className="report-container">
            {embedConfig ? (
                <PowerBIEmbed
                    embedConfig={embedConfig}
                    eventHandlers={eventHandlers}
                    cssClassName={'powerbi-report-style'}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PowerBIReport;
