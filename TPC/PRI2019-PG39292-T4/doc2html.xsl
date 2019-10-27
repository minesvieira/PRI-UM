<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="xhtml"  indent="yes" encoding="UTF-8"></xsl:output>
    
    <xsl:template match="doc">
            <html style="background:#BC8F8F;">
                <head> 
                    <meta charset="UTF-8"/>
                    <h1> <center><xsl:value-of select="tit"/></center></h1>
                    <h3> <center><i> Músico: </i><xsl:value-of select="musico"/></center> </h3>
                </head>
                <body>
                    <table align="center">
                        <tr>
                            <td><b>Província: </b><xsl:value-of select="prov"/></td>
                        </tr>
                        <tr>
                            <td><b>Local: </b><xsl:value-of select="local"/></td>
                        </tr>
                        <tr>
                            <td><b>Tipo de Ficheiro: </b><xsl:value-of select="file/@t"/></td>
                        </tr>
                        <tr>
                            <td><b>Duração: </b><xsl:value-of select="duracao"/></td>
                        </tr>
                    </table>
                </body>
            </html>
    </xsl:template>
    
</xsl:stylesheet>