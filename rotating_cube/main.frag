/*
    Borrowed from https://www.shadertoy.com/view/MlcGDB
    uv Normalized coordinates from main func
    p1 Position 1 to draw the line from
    p2 Position 2 to draw the line to
    t  Thickness of the line
*/
float line(vec2 uv, vec2 p1, vec2 p2, float t) 
{
    vec2 g = p2 - p1;
    vec2 h = uv - p1;
    t /= iResolution.y;
    float d = length(h - g * clamp(dot(g, h) / dot(g,g), 0.0, 1.0));
	return smoothstep(t, 0.5*t, d);
}

mat3 rotationZ(float angle)
{
    return mat3(
        cos(angle),-sin(angle),0,
        sin(angle),cos(angle),0,
        0,0,0
    );
}

mat3 rotationY(float angle)
{
    return mat3(
        cos(angle),0,sin(angle),
        0,1,0,
        -sin(angle),0,cos(angle)
    );
}

mat3 rotationX(float angle)
{
    return mat3(
        1,0,0,
        0,cos(angle),sin(angle),
        0,-sin(angle),cos(angle)
    );
}

mat3 scaler(float scale)
{
    return mat3(
        scale,0,0,
        0,scale,0,
        0,0,scale
    );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;

    //Define set of points
    vec3 points[] = vec3[](
    vec3(-1.0,-1.0,-1.0),
    vec3(-1.0,1.0,-1.0),

    vec3(1.0,-1.0,-1.0),
    vec3(1.0,1.0,-1.0),

    vec3(1.0,-1.0,1.0),
    vec3(-1.0,-1.0,1.0),
    
    vec3(-1.0,1.0,1.0),
    vec3(1.0,1.0,1.0)
    );


    float angle = iTime; //Modify?
    float scale = 0.5;

    //rotate and project points with matrix maths and use time as angle
    vec3 outPoints;
    vec2 projectedPoints[points.length()];
    for (int i = 0; i < points.length(); ++i)
    {
        outPoints = points[i];
        outPoints *= rotationY(angle)
                * rotationX(angle)
                * scaler(scale);
        
        projectedPoints[i] = vec2(outPoints.xy);
    }
    
    float colOut = 0.0;
    bool valid;
    //Add lines to output value
    for (int i = 0; i < points.length(); ++i)
    {
        for (int j = 0; j < points.length(); ++j)
        {
            valid = false;
            if (-points[i].x == points[j].x && points[i].yz == points[j].yz) {valid = true;}
            if (-points[i].y == points[j].y && points[i].xz == points[j].xz) {valid = true;}
            if (-points[i].z == points[j].z && points[i].xy == points[j].xy) {valid = true;}

            if(valid)
            {
                colOut += line(
                    uv, 
                    projectedPoints[i].xy, 
                    projectedPoints[j].xy, 
                    4.0);
            }
            
        }
    }

    const vec3 backColour  = vec3(0.3);
    const vec3 lineColour = vec3(0.35,0.95,0.51);
    
    vec3 colour = mix(backColour, lineColour, colOut);
    //Output colour per pixel
    fragColor = vec4(colour, 1.0);
}