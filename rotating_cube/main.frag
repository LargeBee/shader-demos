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
    float d = length(h - g * clamp(dot(g, h) / dot(g,g), 0.0, 1.0));
	return smoothstep(t, 0.5*t, d);
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


    float angle = 0.9*iTime; //Modify?
    float scale = 1.0;

    //rotate and project points with matrix maths and use time as angle
    mat3 outPoints;
    vec2 projectedPoints[points.length()];
    for (int i = 0; i < points.length(); ++i)
    {
        outPoints = mat3(points[i].x, points[i].y, points[i].z, vec4(0), vec4(0));
        outPoints *= rotationY(angle)
                * rotationX(angle) 
                * scaler(scale);
        
        projectedPoints[i] = vec2(outPoints[0].xy);
    }
    
    float colOut = 0.0;
    //Add lines to output value
    for (int i = 0; i < points.length(); ++i)
    {
        for (int j = 0; j < points.length(); ++j)
        {
            colOut += line(
                uv, 
                projectedPoints[i].xy, 
                projectedPoints[j].xy, 
                0.01);
        }
    }

    const vec3 backColour  = vec3(0.3);
    const vec3 lineColour1 = vec3(0.35,0.95,0.51);
    
    vec3 colour = mix(backColour, lineColour1, colOut);
    //Output colour per pixel
    fragColor = vec4(colour, 1.0);
}