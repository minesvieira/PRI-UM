<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="xhtml"  indent="yes" encoding="UTF-8"></xsl:output>
    
    <xsl:template match="/">
        <xsl:result-document href="website/index.html">
            <html style="background:#BC8F8F;">
                <head> 
                    <meta charset="UTF-8"/>
                </head>
                <body>
                    <center> <h1>Arqueossítios</h1> </center> 
                    <ol>
                        <xsl:apply-templates/> 
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        
        <xsl:apply-templates mode="individual"/>
    </xsl:template>
    <xsl:template match="ARQELEM">
        <li id="{generate-id()}">
            <a href="{generate-id()}.html"><xsl:value-of select="IDENTI"/></a>
        </li>
        
    </xsl:template>
    
    <xsl:template match="ARQELEM" mode="individual">
        <xsl:result-document href="website/{generate-id()}.html">
            <html style="background:#BC8F8F;">
                <head>
                    <meta charset="UTF-8"/>
                </head>
                <body>
                    <h1 style="color:black; background:white;"> <center><xsl:value-of select="IDENTI"/></center></h1>
                    <table style="margin-left:30px;margin-right:30px">
                        <p style="margin-left:30px;margin-right:30px"><xsl:value-of select="DESARQ"/></p>
                        
                        <tr>
                            <th>Descrição:</th><td><xsl:value-of select="DESCRI"/></td>
                        </tr>
                        <tr>
                            <th>Lugar:</th><td><xsl:value-of select="LUGAR"/></td>
                        </tr>
                        <tr>
                            <th>Freguesia:</th><td><xsl:value-of select="FREGUE"/></td>
                        </tr>
                        <tr>
                            <th>Concelho:</th><td><xsl:value-of select="CONCEL"/></td>
                        </tr>
                        <tr>
                            <th>Codadm:</th><td><xsl:value-of select="CODADM"/></td>
                        </tr>
                        <tr>
                            <th>Latitude:</th><td><xsl:value-of select="LATITU"/></td>
                        </tr>
                        <tr>
                            <th>Longitude:</th><td><xsl:value-of select="LONGIT"/></td>
                        </tr>
                        <tr>
                            <th>Altitude:</th><td><xsl:value-of select="ALTITU"/></td>
                        </tr>
                        <tr>
                            <th>Acesso:</th><td><xsl:value-of select="ACESSO"/></td>
                        </tr>
                        <tr>
                            <th>Quadro:</th><td><xsl:value-of select="QUADRO"/></td>
                        </tr>
                        <tr>
                            <th>Autor:</th><td><xsl:value-of select="AUTOR"/></td>
                        </tr>
                        <tr>
                            <th>Data:</th><td><xsl:value-of select="DATA"/></td>
                        </tr>
                        <tr>
                            <th>Interp:</th><td><xsl:value-of select="INTERP"/></td>
                        </tr>
                        <tr>
                            <th>Intere:</th><td><xsl:value-of select="INTERE"/></td>
                        </tr>
                        <tr>
                            <th>Deposi:</th><td><xsl:value-of select="DEPOSI"/></td>
                        </tr>
                        <tr>
                            <th>Traarq:</th><td><xsl:value-of select="TRAARQ"/></td>
                        </tr>
                        
                    </table>
                    
                    <h3 style="margin-left:30px;margin-right:30px"> Bibliografia</h3>
                    <xsl:for-each select="BIBLIO">
                        <p><li style="margin-left:30px;margin-right:30px"><xsl:value-of select="."/></li></p>
                    </xsl:for-each>
                        <address>
                            <center><a href="index.html#{generate-id()}"> <b>Voltar à lista de arqueossitios </b></a></center> 
                        </address>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    
    
    
</xsl:stylesheet>